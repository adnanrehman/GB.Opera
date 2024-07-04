using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GbFacts
{
    public class GbFactDto
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; } = string.Empty;

        

        [Required]
        [DataType(DataType.Date)]
        public DateTime PublishDate { get; set; } = DateTime.Now;

        [Required]
        public float Price { get; set; }
    }
}
