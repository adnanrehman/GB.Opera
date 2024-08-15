using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.LHRUploads
{
    public class Company
    {
        public short CompanyID { get; set; }
        public string  Ticker { get; set; }

        public short parentID { get; set; }

        public string label { get; set; }

        public List<Company>? Children { get; set; } // Nullable to handle optional property

        public Company()
        {
            // Initialize the Children list if needed
            Children = new List<Company>();
        }



    }
}
