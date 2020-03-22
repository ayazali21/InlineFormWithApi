using System;
using System.Collections.Generic;
using System.Text;

namespace InlineFormWithApi.Domain.EntityModel
{
    public class UserDetails :Entity
    {
        private UserDetails()
        {

        }
        public UserDetails(string firstName, string secondName, int age, string photoGuidId,string imageFileType
            )
        {
            FirstName = firstName;
            SecondName = secondName;
            Age = age;
            PhotoGuidId = photoGuidId;
            ImageFileType = imageFileType;
        }

        public string FirstName { get; private set; }
        public string SecondName { get;private set; }
        public int Age { get;private set; }
        public string PhotoGuidId{ get;private set; }
        public string ImageFileType { get; set; }
    }
}
