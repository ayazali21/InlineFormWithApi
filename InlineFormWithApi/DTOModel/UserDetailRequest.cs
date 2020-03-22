using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InlineFormWithApi.DTOModel
{
    public class UserDetailRequest
    {
        [Required]
        public string FirstName { get;  set; }
        [Required]
        public string SecondName { get;  set; }
        [Required]
        public int Age { get;  set; }
        public IFormFile Photo { get;  set; }
    }
}
