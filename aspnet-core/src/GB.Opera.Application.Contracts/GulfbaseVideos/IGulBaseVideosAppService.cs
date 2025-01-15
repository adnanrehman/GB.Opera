using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.GulfbaseVideos
{
    public interface IGulBaseVideosAppService : IApplicationService
    {
        public Task CreateOrUpdateGulfbaseVideo(GulfbaseVideo video);

        public Task<List<GulfbaseVideo>> GetGulfbaseVideo();
    }
}
