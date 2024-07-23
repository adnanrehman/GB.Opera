using CompanyManagements;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyOwnerships
{
    public class CompanyOwnershipDto
    {
        public CompanyOwnershipDto()
        {
            Subsidiaries = new List<SubsidiaryDto>();
            SubsCompUpds = new List<SubsCompUpdDto>();
            SisterCompanies = new List<SisterCompanyDto>();
            CompanyProducts = new List<CompanyProductDto>();
            CompanyRawMaterials = new List<CompanyRawMaterialDto>();
            CompanyFIPs = new List<CompanyFIPDto>();
            MiscNotes = new List<MiscNotesDto>();
        }
        public List<SubsidiaryDto> Subsidiaries { get; set; }
        public List<SubsCompUpdDto> SubsCompUpds { get; set; }
        public List<SisterCompanyDto> SisterCompanies { get; set; }
        public List<CompanyProductDto> CompanyProducts { get; set; }
        public List<CompanyRawMaterialDto> CompanyRawMaterials { get; set; }
        public List<CompanyFIPDto> CompanyFIPs { get; set; }
        public List<MiscNotesDto> MiscNotes { get; set; }
    }
}
