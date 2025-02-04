using Microsoft.AspNetCore.Mvc;
using System.IO;
using System;
using Volo.Abp.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using OfficeOpenXml;
using Reviewers;
using System.Linq;
using System.IO.Pipes;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using OfficeOpenXml.Style;
using System.Drawing;
using Microsoft.AspNetCore.StaticFiles;
using Azure.Storage.Blobs;

namespace GB.Opera.Controllers;

public class FileController : AbpController
{
    private readonly IWebHostEnvironment _env;
    private readonly IReviewerAppService _reviewerAppService;
    private readonly BlobServiceClient _blobserviceClient;
    public FileController(IWebHostEnvironment env, IReviewerAppService reviewerAppService, BlobServiceClient blobserviceClient)
    {
        _env = env;
        _reviewerAppService = reviewerAppService;
        _blobserviceClient = blobserviceClient;
    }
    public ActionResult UploadFile(IFormFile file)
    {
        var uploadDirecotroy = "uploads/";
        var uploadPath = Path.Combine(_env.WebRootPath, uploadDirecotroy);

        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadPath, fileName);

        using (System.IO.Stream stream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyTo(stream);
        }


        return Json(System.IO.File.ReadAllBytes(filePath));
    }

    public ActionResult UploadImage(IFormFile file)
    {
        //var uploadDirecotroy = "uploads/";
        //var uploadPath = Path.Combine(_env.WebRootPath, uploadDirecotroy);

        //if (!Directory.Exists(uploadPath))
        //    Directory.CreateDirectory(uploadPath);

        //var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        //var filePath = Path.Combine(uploadPath, fileName);

        //using (System.IO.Stream stream = new FileStream(filePath, FileMode.Create))
        //{
        //    file.CopyTo(stream);
        //}
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "No file uploaded" });
        }

        try
        {

            var fileExtension = Path.GetExtension(file.FileName);


            var uniqueFileName = $"{Path.GetFileNameWithoutExtension(file.FileName)}_{Guid.NewGuid()}{fileExtension}";


            var containerClient = _blobserviceClient.GetBlobContainerClient("gbnewsfiles");


            var blobClient = containerClient.GetBlobClient(uniqueFileName);


            using (var stream = file.OpenReadStream())
            {
                blobClient.Upload(stream, true);
            }

            return Json(blobClient.Uri.ToString());
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "File upload failed", error = ex.Message });
        }
    }

    public async Task<ActionResult> GetReviewReport(int financialsID)
    {
        var output = await _reviewerAppService.GetReviewReport(financialsID);

        var file = new FileInfo("test.xlsx");
        var package = new ExcelPackage((file));
        var worksheet = package.Workbook.Worksheets.Add("ReviewReport");
        var row = 1;

        var headers = output.IncomeStatement.GroupBy(x => x.AsOfDate).Select(y => y.First());
        var col = 1;
        using (var range = worksheet.Cells[1, 1, 1, headers.Count() + 1])  //Address "A1:A5"
        {
            range.Style.Font.Bold = true;
            range.Style.Fill.PatternType = ExcelFillStyle.Solid;
            range.Style.Fill.BackgroundColor.SetColor(Color.Black);
            range.Style.Font.Color.SetColor(Color.White);
        }
        worksheet.Column(col).Width = 40;
        worksheet.Cells[row, col].Value = "Income Statement";
        col++;
        foreach (var item in headers)
        {
            worksheet.Column(col).Width = 20;
            worksheet.Cells[row, col++].Value = item.AsOfDate;
        }
        row++;

        foreach (var item in output.IncomeStatement)
        {
            var column = 1;
            worksheet.Column(column).Width = 40;
            worksheet.Cells[row, column++].Value = item.Account;
            foreach (var data in headers)
            {
                var value = output.IncomeStatement.Where(f => f.AsOfDate == data.AsOfDate && f.Account == item.Account).FirstOrDefault() == null ? 0 : output.IncomeStatement.Where(f => f.AsOfDate == data.AsOfDate && f.Account == item.Account).Select(f => f.Value).FirstOrDefault();
                worksheet.Cells[row, column++].Value = value;
            }
            row++;
        }
        row++;
        row++;
        var headersNew = output.BalanceSheet.GroupBy(x => x.AsOfDate).Select(y => y.First());
        var colNew = 1;
        using (var range = worksheet.Cells[row, 1, row, headersNew.Count() + 1])  //Address "A1:A5"
        {
            range.Style.Font.Bold = true;
            range.Style.Fill.PatternType = ExcelFillStyle.Solid;
            range.Style.Fill.BackgroundColor.SetColor(Color.Black);
            range.Style.Font.Color.SetColor(Color.White);
        }
        worksheet.Column(colNew).Width = 40;
        worksheet.Cells[row, colNew].Value = "Balance Sheet";
        colNew++;
        foreach (var item in headersNew)
        {
            worksheet.Column(colNew).Width = 20;
            worksheet.Cells[row, colNew++].Value = item.AsOfDate;
        }
        row++;

        foreach (var item in output.BalanceSheet)
        {
            var columnNew = 1;
            worksheet.Column(columnNew).Width = 40;
            worksheet.Cells[row, columnNew++].Value = item.Account;
            foreach (var data in headersNew)
            {
                worksheet.Column(columnNew).Width = 20;
                var value = output.BalanceSheet.Where(f => f.AsOfDate == data.AsOfDate && f.Account == item.Account).FirstOrDefault() == null ? 0 : output.BalanceSheet.Where(f => f.AsOfDate == data.AsOfDate && f.Account == item.Account).Select(f => f.Value).FirstOrDefault();
                worksheet.Cells[row, columnNew++].Value = value;
            }
            row++;
        }

        var stream = new MemoryStream();
        await package.SaveAsAsync(stream);
        stream.Position = 0;

       var uploadDirecotroy = "uploads/";
        var uploadPath = Path.Combine(_env.WebRootPath, uploadDirecotroy);

        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        var fileName = Guid.NewGuid() + ".xlsx";
        var filePath = Path.Combine(uploadPath, fileName);
        var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write);
        stream.CopyTo(fileStream);
        fileStream.Dispose();
        return Json(new { filePath = filePath,fileName = fileName});
    }

    public async Task<IActionResult> DocumentsDownload([FromQuery] string fileUrl)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileUrl);
        if (!System.IO.File.Exists(filePath)) return NotFound();
        var memory = new MemoryStream();
        await using (var stream = new FileStream(filePath, FileMode.Open))
        {
            await stream.CopyToAsync(memory);
        }
        memory.Position = 0;
        return File(memory, GetContentType(filePath), filePath);
    }
    private string GetContentType(string path)
    {
        var provider = new FileExtensionContentTypeProvider();
        string contentType;
        if (!provider.TryGetContentType(path, out contentType))
        {
            contentType = "application/octet-stream";
        }
        return contentType;
    }
}
