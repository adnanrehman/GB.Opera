using Commons;
using Dapper;
using Entry;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Description;
using System.Xml.Linq;
using Volo.Abp.Application.Services;

namespace CountryGroups
{
    public class CountryGroupAppService : ApplicationService, ICountryGroupAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CountryGroupAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<CountryGroupInputDto> GetCountryGroups()
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCountryGroupInfo_New,
                commandType: CommandType.StoredProcedure);
                var output = new CountryGroupInputDto();
                output.CountryGroups = reader.Read<CountryGroupDto>().OrderBy(f => f.CountryGroup).ToList();
                output.Sectors = reader.Read<SectorDto>().ToList();
                output.CapSizes = reader.Read<CapSizeDto>().ToList();
                output.GBSectors = reader.Read<GBSectorDto>().ToList();
                output.GBCapSizes = reader.Read<GBSectorDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        
        public async Task InsertCountryGroup(InsertCountryGroupDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CountryGroupID", model.CountryGroup.CountryGroupID);
                parameters.Add("@CountryGroup", model.CountryGroup.CountryGroup);
                parameters.Add("@ACountryGroup", model.CountryGroup.ACountryGroup);
                parameters.Add("@NumberOfCountries", model.CountryGroup.NumberOfCountries);
                parameters.Add("@FormationDate", model.CountryGroup.FormationDate);
                parameters.Add("@Overview", model.CountryGroup.Overview);
                parameters.Add("@AOverview", model.CountryGroup.AOverview);
                parameters.Add("@Description", model.CountryGroup.Description);
                parameters.Add("@ADescription", model.CountryGroup.ADescription);
                parameters.Add("@IsActive", model.CountryGroup.IsActive);

                //await _connection.ExecuteAsync(ProcedureNames.usp_InsertCGroup_New, parameters, commandType: CommandType.StoredProcedure);
                var countryGroupId = await _connection.QuerySingleAsync<int>(ProcedureNames.usp_InsertCGroup_New, parameters, commandType: CommandType.StoredProcedure);

                // delete old Records
                var parameters4 = new DynamicParameters();
                parameters4.Add("@CountryGroupID", countryGroupId);

                await _connection.ExecuteAsync(ProcedureNames.usp_DeleteAllOldGBSectors_New, parameters4, commandType: CommandType.StoredProcedure);



                foreach (var item in model.GBSectors)
                {
                    var parameters2 = new DynamicParameters();
                    parameters2.Add("@CountryGroupID", countryGroupId);
                    parameters2.Add("@SectorID", item.SectorID);
                    parameters2.Add("@IsCapSize", false);

                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertNewGBSector_New, parameters2, commandType: CommandType.StoredProcedure);
                }

                foreach (var item in model.GBCapSizes)
                {
                    var parameters3 = new DynamicParameters();
                    parameters3.Add("@CountryGroupID", countryGroupId);
                    parameters3.Add("@SectorID", item.SectorID);
                    parameters3.Add("@IsCapSize", true);

                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertNewGBSector_New, parameters3, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
