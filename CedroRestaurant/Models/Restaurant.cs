using CedroRestaurant.Shared;
using System.Collections.Generic;

namespace CedroRestaurant.Models
{
    public class Restaurant : Entity
    {
        #region Constructor

        public Restaurant()
        {
            
        }

        public Restaurant(string name)
        {
            Name = name;
        }

        #endregion

        #region Properties

        public string Name { get; set; }

        public virtual ICollection<Dish> Dishes { get; set; }
        
        #endregion

        #region Methods

        //This class don't have methods

        #endregion
    }
}
