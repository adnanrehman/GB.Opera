using Microsoft.AspNetCore.Mvc;
using System.IO;
using System;
using Volo.Abp.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace GB.Opera.Controllers;

public class FileController : AbpController
{
    private readonly IWebHostEnvironment _env;
    public FileController(IWebHostEnvironment env)
    {
        _env = env;
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
}
