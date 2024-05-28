using AutoMapper;
using GB.Opera.Books;

namespace GB.Opera;

public class OperaApplicationAutoMapperProfile : Profile
{
    public OperaApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<Book, BookDto>();
        CreateMap<CreateUpdateBookDto, Book>();
    }
}
