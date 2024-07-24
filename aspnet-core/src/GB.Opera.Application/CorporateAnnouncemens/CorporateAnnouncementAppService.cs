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

namespace CorporateAnnouncements
{
    public class CorporateAnnouncementAppService : ApplicationService, ICorporateAnnouncementAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CorporateAnnouncementAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CorporateAnnouncementDto>> GetCorporateAnnouncements(int companyID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CorporateAnnouncementDto>(sql: "usp_getAnnoucementsInfo",
                                param: new { CompanyID = companyID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<CorporateAnnouncementDto> CreateOrUpdateCorporateAnnouncement(CorporateAnnouncementDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Ticker", model.Ticker);
                parameters.Add("AnnouncementDate", model.AnnouncedDate);
                parameters.Add("@Announcement", model.Announcement);
                parameters.Add("@AAnnouncement", model.AAnnouncement);
                parameters.Add("@GulfbaseID", model.GulfbaseID);

                await _connection.ExecuteAsync("usp_DT_InsertUpdateCorporateAnnouncements", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteCorporateAnnouncement(Int64 corporateAnnouncementID)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CorporateAnnouncementID", corporateAnnouncementID);

                await _connection.ExecuteAsync("[usp_DeleteCooperateAnnouncement]", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


    }
}
