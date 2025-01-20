using Commons;
using Companies;
using Dapper;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using OfficeOpenXml.Interfaces.Drawing.Text;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Volo.Abp.Application.Services;

namespace GB.Opera.ProductServiceRaw
{
    public  class ProductServiceAppService : ApplicationService, IProductServiceAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public ProductServiceAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<ProcductServiceRaw>> GetAllProcductServiceRaw()
        {

            var results = await _connection.QueryMultipleAsync(
                sql: ProcedureNames.usp_getAllPSRMappings_New,
                commandType: CommandType.StoredProcedure
            );



            var gbProcductServicList = new List<ProcductServiceRaw>();
            var gbProcductServic = new ProcductServiceRaw();
            gbProcductServic.Name = "Product ,Service and Raw Meterials";
            gbProcductServic.ParentID = -1;
            gbProcductServicList.Add(gbProcductServic);


            while (!results.IsConsumed)
            {
                var resultSet = await results.ReadAsync<ProcductServiceRaw>();
                gbProcductServicList.AddRange(resultSet);
            }


            return gbProcductServicList;
        }
        public ProductsRaw SaveUpdate(ProductsRaw gbFact)
        {

            var parameters = new
            {
                ProductServiceRawID = gbFact.ProductServiceRawID,
                ParentID = gbFact.ParentID,
                Name = gbFact.Name,
                AName = gbFact.AName,
                Description = gbFact.Description,
                ADescription = gbFact.ADescription,
                IsTitle = gbFact.IsTitle
            };

            _connection.Execute(ProcedureNames.usp_AddUpdatePSR_New, parameters, commandType: CommandType.StoredProcedure);

            return gbFact;
        }

        public async Task<List<ProductsRaw>> GetProductServiceRawByID(short ProductServiceRawID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@ProductServiceRawID", ProductServiceRawID, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<ProductsRaw>(
                sql: ProcedureNames.USP_GetProductServiceRawByID,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }
    }
}
