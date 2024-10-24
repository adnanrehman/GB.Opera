﻿using Microsoft.AspNetCore.Mvc;
using System.IO;
using System;
using Volo.Abp.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using GB.Opera.EndOfDay;

namespace GB.Opera.Controllers;

public class ImportController : AbpController
{
    private readonly IWebHostEnvironment _env;
    private readonly IEndofDayAppService _endOfDayAppService;
    public ImportController(IWebHostEnvironment env, IEndofDayAppService endOfDayAppService)
    {
        _env = env;
        _endOfDayAppService = endOfDayAppService;
    }
    public async Task<ActionResult> ImportPrices(IFormFile file)
    {
        var uploadDirecotroy = "uploads/";
        var uploadPath = Path.Combine(_env.WebRootPath, uploadDirecotroy);

        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        var fileName = file.FileName;
        var filePath = Path.Combine(uploadPath, fileName);

        using (System.IO.Stream stream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyTo(stream);
        }
        var data = await _endOfDayAppService.ImportPrices(filePath);
        
        return Json(data);
    }

}