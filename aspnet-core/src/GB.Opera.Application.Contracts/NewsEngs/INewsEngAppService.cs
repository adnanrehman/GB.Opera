using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace NewsEngs
{
    public interface INewsEngAppService : IApplicationService
    {
        Task<List<NewsEngDto>> GetNewsEngs();
        Task<NewsEngDto> CreateOrUpdateNewsEng(NewsEngDto input);

    }
}

