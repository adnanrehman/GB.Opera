using System;
using System.Collections.Generic;
using System.Text;

namespace GB.Opera.CurrenciesExchange
{
    public  class CurrencyExchangeDto
    {
        public Int32 CurrencyExchangeID { get; set; }
        public string CurrencyFrom { get; set; }
        public string CurrencyTo { get; set; }
        public double Exchange { get; set; }
        public DateTime Date { get; set; }

    }
}
