using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.OfficialsIndics
{
    public class GlobalIndices
    {
        public bool IsActive { get; set; }
        public string Market { get; set; }
        public long GlobalIndexID { get; set; }
        public DateTime Date { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }
        public decimal Volume { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
