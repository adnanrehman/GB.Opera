using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.NewSources
{
    public  class NewSourceDto
    {
        public Int16 SourceID { get; set; }

        public string? Source { get; set; }

        public string? ASource { get; set; }

        public bool? IsEnglish { get; set; }
    }
}
