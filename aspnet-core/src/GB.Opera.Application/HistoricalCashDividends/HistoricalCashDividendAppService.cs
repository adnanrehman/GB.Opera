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
using System.Xml.Linq;
using Volo.Abp.Application.Services;

namespace HistoricalCashDividends
{
    public class HistoricalCashDividendAppService : ApplicationService, IHistoricalCashDividendAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public HistoricalCashDividendAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public async Task<HistoricalCashDividendListDto> GetHistoricalCashDividends(int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getHistoricalCashDividends,
                    param: new { @CompanyID = companyID },
                commandType: CommandType.StoredProcedure);
                var output = new HistoricalCashDividendListDto();
                output.HistoricalCashDividends = reader.Read<HistoricalCashDividendDto>().ToList();
                output.CashDivDates = reader.Read<CashDivDateDto>().ToList();
                foreach (var item in output.HistoricalCashDividends) { 
                item.CashDivDates = output.CashDivDates.Where(f => f.CashDivID == item.CashDivID).ToList();
                    foreach (var data in item.CashDivDates)
                    {
                        if (data.DateSelection == "As of")
                        {
                            item.AsOf = true; 
                            item.AsOfDateTime = data.CashDivDate;
                        }
                            
                        if (data.DateSelection == "Announced on")
                        {
                            item.AnnouncedOn = true;
                            item.AnnouncedOnDateTime = data.CashDivDate;
                        }
                            
                        if (data.DateSelection == "Approved on")
                        {
                            item.ApprovedOn = true;
                            item.ApprovedOnDateTime = data.CashDivDate;
                        }
                            
                        if (data.DateSelection == "Due on")
                        {
                            item.DueOn = true;
                            item.DueOnDateTime = data.CashDivDate;
                        }
                            
                        if (data.DateSelection == "X-dividend Date")
                        {
                            item.XDividendDate = true;
                            item.XDividendDateTime = data.CashDivDate;
                        }                            
                    }
                }
                output.EPeriods = reader.Read<EPeriodDto>().ToList();
                output.Sources = reader.Read<SourceDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task InsetUpdateHistoricalCashDividends(CreateHistoricalCashDividendDto input)
        {
            try
            {
                var userId = Guid.NewGuid();
                var parameters = new DynamicParameters();
                parameters.Add("@CashDivID", input.HistoricalCashDividend.CashDivID);
                parameters.Add("@CompanyID", input.HistoricalCashDividend.CompanyID);
                parameters.Add("@ExtraPeriodID", input.HistoricalCashDividend.ExtraPeriodID);
                parameters.Add("@OtherPeriod", input.HistoricalCashDividend.OtherPeriod);
                parameters.Add("@AOtherPeriod", input.HistoricalCashDividend.AOtherPeriod);
                parameters.Add("@Year", input.HistoricalCashDividend.Year);
                parameters.Add("@Remarks", input.HistoricalCashDividend.Remarks);
                parameters.Add("@ARemarks", input.HistoricalCashDividend.ARemarks);
                parameters.Add("@TotalAmount", input.HistoricalCashDividend.TotalAmount);
                parameters.Add("@PerShareAmount", input.HistoricalCashDividend.PerShareAmount);
                parameters.Add("@TreasuryShares", input.HistoricalCashDividend.TreasuryShares);
                parameters.Add("@OutstandingShares", input.HistoricalCashDividend.OutstandingShares);
                parameters.Add("@SourceID", input.HistoricalCashDividend.SourceID);

                var data = await _connection.QuerySingleAsync<int>(ProcedureNames.usp_InsetUpdateHistoricalCashDividends, parameters, commandType: CommandType.StoredProcedure);

                foreach (var item in input.CashDivDates) {
                    var parameters2 = new DynamicParameters();
                    parameters2.Add("@CashDivID", data);
                    parameters2.Add("@DateSelection", item.DateSelection);
                    parameters2.Add("@CashDivDate", item.CashDivDate);

                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertUpdateCashDividendsDates, parameters2, commandType: CommandType.StoredProcedure);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
