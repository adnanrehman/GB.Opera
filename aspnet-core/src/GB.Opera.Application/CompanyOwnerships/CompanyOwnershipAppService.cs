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
using CompanyOwnerships;
using System.Drawing;
using System.Runtime.ConstrainedExecution;

namespace CompanyOwnerships
{
    public class CompanyOwnershipAppService : ApplicationService, ICompanyOwnershipAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyOwnershipAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<CompanyOwnershipDto> GetRelatedInformations(int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync("usp_getCompanyRelatedInformations",
                            param: new { CompanyID = companyID },
                            commandType: CommandType.StoredProcedure);
                var output = new CompanyOwnershipDto();
                output.Subsidiaries = reader.Read<SubsidiaryDto>().ToList();
                output.SubsCompUpds = reader.Read<SubsCompUpdDto>().ToList();
                output.SisterCompanies = reader.Read<SisterCompanyDto>().ToList();
                output.CompanyProducts = reader.Read<CompanyProductDto>().ToList();
                output.CompanyRawMaterials = reader.Read<CompanyRawMaterialDto>().ToList();
                output.CompanyFIPs = reader.Read<CompanyFIPDto>().ToList();
                output.MiscNotes = reader.Read<MiscNotesDto>().ToList();

                return output;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<SubsidiaryDto> CreateOrUpdateSubsidiary(SubsidiaryDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@SubsidiaryID", model.SubsidiaryID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Country", model.Country);
                parameters.Add("@ACountry", model.ACountry);
                parameters.Add("@SubsidiaryCompany", model.SubsidiaryCompany);
                parameters.Add("@ASubsidiaryCompany", model.ASubsidiaryCompany);
                parameters.Add("@Share", model.Share);
                parameters.Add("@PrincipalActivity", model.PrincipalActivity);
                parameters.Add("@CustomOrder", model.CustomOrder);
                parameters.Add("@CompanyTypeID", model.CompanyTypeID);

                await _connection.ExecuteAsync("usp_InsertUpdateSubsidiaries ", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<SubsCompUpdDto> CreateOrUpdateSubsCompUpdate(SubsCompUpdDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@SubsCompUpdID", model.SubsCompUpdID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Remarks", model.Remarks);
                parameters.Add("@ARemarks", model.ARemarks);
                parameters.Add("@UploadDate", model.UploadDate);


                await _connection.ExecuteAsync("usp_InsertUpdateSubsCompUpdate ", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<SisterCompanyDto> CreateOrUpdateSisterCompany(SisterCompanyDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@SisterCompanyID", model.SisterCompanyID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@SisterCompany", model.SisterCompany);
                parameters.Add("@ASisterCompany", model.ASisterCompany);
                parameters.Add("@Relation", model.Relation);
                parameters.Add("@ARelation", model.ARelation);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@IsActive", true);
                parameters.Add("@CreationDate", DateTime.Now);

                await _connection.ExecuteAsync("usp_InsertUpdateSistorCompanies ", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CompanyProductDto> CreateOrUpdateCompanyProduct(CompanyProductDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CompanyProductID", model.CompanyProductID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@CompanyProduct", model.CompanyProduct);
                parameters.Add("@ACompanyProduct", model.ACompanyProduct);
                parameters.Add("@LaunchDate", model.LaunchDate);
                parameters.Add("@LastProduct", model.LastProduct);
                parameters.Add("@ALastProduct", model.ALastProduct);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@IsActive", true);
                parameters.Add("@CreationDate", DateTime.Now);

                await _connection.ExecuteAsync("usp_InsertUpdateCompaniesProducts ", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CompanyRawMaterialDto> CreateOrUpdateRawMaterial(CompanyRawMaterialDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@RawMaterialID", model.RawMaterialID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@RawMaterial", model.RawMaterial);
                parameters.Add("@ARawMaterial", model.ARawMaterial);
                parameters.Add("@CurrentProvider", model.CurrentProvider);
                parameters.Add("@ACurrentProvider", model.ACurrentProvider);
                parameters.Add("@LastProvider", model.LastProvider);
                parameters.Add("@ALastProvider", model.ALastProvider);
                parameters.Add("@Reason", model.Reason);
                parameters.Add("@AReason", model.AReason);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@CreationDate", DateTime.Now);
                parameters.Add("@IsActive", true);

                await _connection.ExecuteAsync("usp_InsertUpdateRawMaterials ", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CompanyFIPDto> CreateOrUpdateCompanyFIP(CompanyFIPDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FIPID", model.FIPID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@PermittedSharesToForeigners", model.PermittedSharesToForeigners);
                parameters.Add("@PermittedSharesToGCCNationals", model.PermittedSharesToGCCNationals);
                parameters.Add("@PermittedSharesToArabNationals", model.PermittedSharesToArabNationals);
                parameters.Add("@PermittedDate", model.PermittedDate);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@CreationDate", DateTime.Now);
                parameters.Add("@IsActive", true);

                await _connection.ExecuteAsync("usp_InsertUpdateForeignInvementOptions ", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<MiscNotesDto> CreateOrUpdateMiscNote(MiscNotesDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@MiscNotesID", model.MiscNotesID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Date", model.Date);
                parameters.Add("@Note", model.Note);
                parameters.Add("@ANote", model.ANote);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@CreationDate", DateTime.Now);
                parameters.Add("@IsActive", true);

                await _connection.ExecuteAsync("usp_InsertUpdateMiscNotes ", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
