using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.GbOwnerShips
{
    public  class GbOwnerShip
    {
        public short GBOwnershipID { get; set; }

        public short ParentID { get; set; }

        public string GBOwnership { get; set; }

        public string AGBOwnership { get; set; }


        public bool IsGBOwnership { get; set; }

        public bool IsTitle { get; set; }
    }
}
