using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetAll();
        int Create(TEntity entity);
        void Delete(TEntity entity);
        int Update(TEntity entity);
        

    }
}
