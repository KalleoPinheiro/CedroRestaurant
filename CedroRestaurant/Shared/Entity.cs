using System;

namespace CedroRestaurant.Shared
{
    public class Entity
    {
        #region Constructor

        public Entity()
        {
            Id = Guid.NewGuid();
            CreateDate = DateTime.Now;
        }
        #endregion

        #region Properties

        public Guid Id { get; set; }
        public DateTime CreateDate { get; set; }

        #endregion
    }
}
