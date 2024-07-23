using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyManagements
{
    public class ManagementDto
    {
        public int ManagementID { get; set; }
        public int CompanyID { get; set; }
        public string? Chairman { get; set; }
        public string? AChairman { get; set; }
        public string? HonoraryChairman { get; set; }
        public string? AHonoraryChairman { get; set; }
        public string? ViceChairman { get; set; }
        public string? AViceChairman { get; set; }
        public string? President { get; set; }
        public string? APresident { get; set; }
        public string? HonoraryPresident { get; set; }
        public string? AHonoraryPresident { get; set; }
        public string? VicePresident { get; set; }
        public string? AVicePresident { get; set; }
        public string? ManagingDirector { get; set; }
        public string? AManagingDirector { get; set; }
        public string? DeputyManagingDirector { get; set; }
        public string? ADeputyManagingDirector { get; set; }
        public string? GeneralManager { get; set; }
        public string? AGeneralManager { get; set; }
        public string? CEO { get; set; }
        public string? ACEO { get; set; }
        public DateTime? Since { get; set; }
        public DateTime? Till { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime? GulfbaseUpdateDate { get; set; }

    }
}
