using Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CountryFactOrders
{
    public class CountryFactOrderDto
    {
        public Int64 CountryFactOrdrID { get; set; }
        public int CountryID { get; set; }
        public int ESDFactIDOrder { get; set; }
        public string? FactName { get; set; }
        public decimal CustomOrder { get; set; }
        public bool IsActive { get; set; }
        public string? MeasurementUnit { get; set; }
        public string? Currency { get; set; }
    }

}
