using DataModel;
using DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class WinnerModel
    {
        public string UserName { get; set; }
        public List<int> WinningNumbers { get; set; }
        public LottoSessionModel Session { get; set; }
        public string Prize { get; set; }
        public int Matches { get; set; }
    }
}
