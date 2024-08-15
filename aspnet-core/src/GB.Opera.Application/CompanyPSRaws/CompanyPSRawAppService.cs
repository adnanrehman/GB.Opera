using Dapper;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Volo.Abp.Data;
using Commons;
using System.Reflection;
using System.ComponentModel.Design;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CompanyPSRaws
{
    public class CompanyPSRawAppService : ApplicationService, ICompanyPSRawAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyPSRawAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<CompanyPSRawOutputDto> GetCompanyPSRaws(int productServiceRawID, int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync("[getPSRParentID]",
                    param: new { @ProductServiceRawID = productServiceRawID, @CompanyID = companyID },
                commandType: CommandType.StoredProcedure);
                var output = new CompanyPSRawOutputDto();
                output.ProductServiceRawID = reader.Read<int>().FirstOrDefault();
                if (productServiceRawID == 1)
                {
                    output.PSRCompanyProducts = reader.Read<PSRCompanyProductDto>().ToList();
                }
                else if (productServiceRawID == 2)
                {
                    output.PSRCompanyServices = reader.Read<PSRCompanyServiceDto>().ToList();
                }
                else if (productServiceRawID == 3)
                {
                    output.PSRCompanyRawMaterials = reader.Read<PSRCompanyRawMaterialDto>().ToList();
                }
                
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<PSRCompanyServiceDto> CreateOrUpdatePSRCompanyService(PSRCompanyServiceDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CompServiceID", model.CompServiceID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@ProductServiceRawID", model.ProductServiceRawID);
                parameters.Add("@ParentID", model.ParentID);
                parameters.Add("@ServiceStart", model.ServiceStart);
                parameters.Add("@ServiceRange", model.ServiceRange);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@IsActive", model.IsActive);

                await _connection.ExecuteAsync("[usp_InsertUpdatePSRCompanyServices]", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<PSRCompanyProductDto> CreateOrUpdatePSRCompanyProduct(PSRCompanyProductDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CompProductID", model.CompProductID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@ProductServiceRawID", model.ProductServiceRawID);
                parameters.Add("@ParentID", model.ParentID);
                parameters.Add("@ProductionStart", model.ProductionStart);
                parameters.Add("@CapacityPerAnnum", model.CapacityPerAnnum);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@IsActive", model.IsActive);

                await _connection.ExecuteAsync("[usp_InsertUpdatePSRCompanyProducts]", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<PSRCompanyRawMaterialDto> CreateOrUpdatePSRCompanyRawMaterial(PSRCompanyRawMaterialDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CompRawID", model.CompRawID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@ProductServiceRawID", model.ProductServiceRawID);
                parameters.Add("@ParentID", model.ParentID);
                parameters.Add("@UsePerAnnum", model.UsePerAnnum);
                parameters.Add("@Suppliers", model.Suppliers);
                parameters.Add("@ASuppliers", model.ASuppliers);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@IsActive", model.IsActive);

                await _connection.ExecuteAsync("[usp_InsertUpdatePSRCompanyRawMaterials]", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
