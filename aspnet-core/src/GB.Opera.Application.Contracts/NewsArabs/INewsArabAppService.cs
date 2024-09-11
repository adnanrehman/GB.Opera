using NewsEngs;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NewsArabs
{
    public interface INewsArabAppService : IApplicationService
    {
        Task<List<NewsEngDto>> GetNewsArabs();
        Task<NewsArabDto> CreateOrUpdateNewsArab(NewsArabDto input);

    }
}

