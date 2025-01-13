using GB.Opera.News;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace News
{
    public interface INewsAppService : IApplicationService
    {
        Task<List<NewsDto>> GetNews(bool langId, int newsId);
        Task<NewsDto> CreateOrUpdateNews(NewsDto input);
        Task DeleteNews(bool langId, int newsId);
        public Task<List<NewsSourceDto>> GetSource(int newsId);

    }
}

