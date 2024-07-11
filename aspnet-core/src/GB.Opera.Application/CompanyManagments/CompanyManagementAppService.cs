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
using CompanyManagements;
using System.Drawing;
using System.Runtime.ConstrainedExecution;

namespace CompanyManagements
{
    public class CompanyManagmentAppService : ApplicationService, ICompanyManagementAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyManagmentAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CompanyManagementDto>> GetCompaniesManagement(int companyID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CompanyManagementDto>(sql: "usp_getCompaniesManagement",
                                param: new { CompanyID = companyID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<ManagementDto> CreateOrUpdateCompanyManagement(ManagementDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ManagementID", model.ManagementID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Chairman", model.Chairman);
                parameters.Add("@HonoraryChairman", model.HonoraryChairman);
                parameters.Add("@AHonoraryChairman", model.AHonoraryChairman);
                parameters.Add("@ViceChairman", model.ViceChairman);
                parameters.Add("@President", model.President);
                parameters.Add("@APresident", model.APresident);
                parameters.Add("@HonoraryPresident", model.HonoraryPresident);
                parameters.Add("@AHonoraryPresident", model.AHonoraryPresident);
                parameters.Add("@VicePresident", model.VicePresident);
                parameters.Add("@AVicePresident", model.AVicePresident);
                parameters.Add("@ManagingDirector", model.ManagingDirector);
                parameters.Add("@DeputyManagingDirector", model.DeputyManagingDirector);
                parameters.Add("@ADeputyManagingDirector", model.ADeputyManagingDirector);
                parameters.Add("@GeneralManager", model.GeneralManager);
                parameters.Add("@AGeneralManager", model.AGeneralManager);
                parameters.Add("@CEO", model.CEO);
                parameters.Add("@ACEO", model.ACEO);
                parameters.Add("@Since", model.Since);
                parameters.Add("@Till", model.Till);
                parameters.Add("@CreationDate", model.CreationDate);
                parameters.Add("@IsActive", model.IsActive);
                parameters.Add("@GulfbaseUpdateDate", model.GulfbaseUpdateDate);

                await _connection.ExecuteAsync("usp_InsertManagements ", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
