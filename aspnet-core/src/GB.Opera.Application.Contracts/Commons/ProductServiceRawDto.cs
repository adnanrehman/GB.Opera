using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Commons
{
    public class ProductServiceRawDto
    {
        public int ProductServiceRawID { get; set; }
        public int ParentID { get; set; }
        public string? Name { get; set; }
        public string? AName { get; set; }
    }
}
