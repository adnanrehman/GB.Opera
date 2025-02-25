using GB.Opera.NewSources;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
namespace GB.Opera.NewSources
{
    public  interface INewSourceAppService
    {
        public NewSourceDto SaveUpdate(NewSourceDto source);
        public   Task<List<NewSourceDto>> GetNewSourceByID(short Source);

        public Task<List<NewSourceDto>> GetNewSource();
    }
}
