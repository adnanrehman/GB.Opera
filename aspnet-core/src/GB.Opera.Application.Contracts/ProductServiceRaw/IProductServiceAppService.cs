using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.ProductServiceRaw
{
    public  interface IProductServiceAppService
    {
        public   Task<List<ProcductServiceRaw>> GetAllProcductServiceRaw();
        public ProductsRaw SaveUpdate(ProductsRaw gbFact);
        public Task<List<ProductsRaw>> GetProductServiceRawByID(short ProductServiceRawID);
    }
}
