using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.BatchAdmin
{
    public  class CountriesAdmin
    {
        public Int16 CountryID { get; set; }
        public string  Abbr { get; set; }
    }

    public class Entryusers
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
    }
  
    public class AdminStatus
    {
        public Int16 StatusId { get; set; }
        public string Status { get; set; }
    }
}
