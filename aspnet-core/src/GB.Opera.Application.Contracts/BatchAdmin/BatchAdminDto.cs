using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.BatchAdmin
{
    public class BatchAdminDto
    {
        public BatchAdminDto()
    { 
        Countries = new List<CountriesAdmin>();
        entryusers = new List<Entryusers>();
         
          adminStatus = new List<AdminStatus>();

    }
    public List<CountriesAdmin> Countries { get; set; }
     public List<Entryusers> entryusers { get; set; }

       
        public List<AdminStatus> adminStatus { get; set; }

    }
}
