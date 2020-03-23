using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using InlineFormWithApi.Domain.EntityModel;
using InlineFormWithApi.DTOModel;
using InlineFormWithApi.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InlineFormWithApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> logger;
        private readonly IUserDetailRepository userDetailRepository;

        public UserController(ILogger<UserController> logger,IUserDetailRepository userDetailRepository)
        {
            this.logger = logger;
            this.userDetailRepository = userDetailRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm]UserDetailRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string photoGuid = string.Empty;
                    string extension = string.Empty;
                    // Saving Image on Server
                    if (model.Photo?.Length > 0)
                    {
                        photoGuid = Guid.NewGuid().ToString();
                        var image = model.Photo;
                        extension = Path.GetExtension(image.FileName);

                        var filePath = Path.Combine("wwwroot/images", $"{photoGuid}.{extension}");

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            image.CopyTo(fileStream);
                        }
                    }
                    var userDetails = new UserDetails(model.FirstName, model.SecondName, model.Age, photoGuid, extension);
                    userDetailRepository.Add(userDetails);
                    return Ok("success");
                }
                else
                {
                    return BadRequest("Model Validation Failed");
                }
            }
            catch(Exception ex)
            {
                //log error 
                logger.LogError(ex, $"{nameof(UserController)} - {nameof(Post)}");
                return BadRequest();
            }
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await userDetailRepository.GetAllAsync();
                return Ok(result);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("Download")]
        public async Task<IActionResult> Download([FromQuery] string fileName)
        {
            var filePath = Path.Combine("wwwroot/images", fileName);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(filePath));
        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

    }
}
