using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.ProductServiceRaw
{
    public  class ProductsRaw
    {
        public Int16 ProductServiceRawID { get; set; }

        public Int16? ParentID { get; set; }

        public string? Name { get; set; }

        public string? AName { get; set; }
        public string? Description { get; set; }
        public string? ADescription { get; set; }

        public bool? IsTitle { get; set; }
    }
}
