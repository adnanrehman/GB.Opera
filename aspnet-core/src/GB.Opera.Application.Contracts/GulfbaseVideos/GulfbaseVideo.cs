using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.GulfbaseVideos
{
    public   class GulfbaseVideo
    {
        public Int64 Id { get; set; }

        public string Tag { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public bool IsHome { get; set; }
        public int SortOrder { get; set; }
    }
}
