using System;
using CedroRestaurant.Shared;

namespace CedroRestaurant.Models
{
    public class Dish : Entity
    {
        #region Constructor

        public Dish()
        {
            
        }

        public Dish(string name, decimal price, Restaurant restaurant)
        {
            Name = name;
            Price = price;
            Restaurant = restaurant;
        }

        #endregion

        #region Properties

        public string Name { get; set; }
        public decimal Price { get; set; }

        public Guid RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }

        #endregion

        #region Methods

        //This class don't have methods

        #endregion
    }
}