using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyPSRaws
{
    public class PSRCompanyServiceDto
    {
        public Int64 CompServiceID { get; set; }
        public int CompanyID { get; set; }
        public int ProductServiceRawID { get; set; }
        public int ParentID { get; set; }
        public decimal? ServiceRange { get; set; }
        public DateTime? ServiceStart { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public bool IsActive { get; set; }

    }
    public class PSRCompanyProductDto
    {
        public Int64 CompProductID { get; set; }
        public int CompanyID { get; set; }
        public int ProductServiceRawID { get; set; }
        public int ParentID { get; set; }
        public decimal? CapacityPerAnnum { get; set; }
        public DateTime? ProductionStart { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }
        public bool IsActive { get; set; }

    }

    public class PSRCompanyRawMaterialDto
    {
        public Int64 CompRawID { get; set; }
        public int CompanyID { get; set; }
        public int ProductServiceRawID { get; set; }
        public int ParentID { get; set; }
        public decimal? UsePerAnnum { get; set; }
        public string? Description { get; set; }
        public string? ASuppliers { get; set; }
        public string? Suppliers { get; set; }
        public string? ADescription { get; set; }
        public bool IsActive { get; set; }

    }

    public class CompanyPSRawOutputDto
    {
        public CompanyPSRawOutputDto()
        {
            PSRCompanyServices = new List<PSRCompanyServiceDto>();
            PSRCompanyProducts = new List<PSRCompanyProductDto>();
            PSRCompanyRawMaterials = new List<PSRCompanyRawMaterialDto>();
        }
        public int ProductServiceRawID { get; set; }
        public List<PSRCompanyServiceDto> PSRCompanyServices { get; set; }
        public List<PSRCompanyProductDto> PSRCompanyProducts { get; set; }
        public List<PSRCompanyRawMaterialDto> PSRCompanyRawMaterials { get; set; }
    }
}
