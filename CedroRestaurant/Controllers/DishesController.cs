﻿using CedroRestaurant.Contexts;
using CedroRestaurant.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CedroRestaurant.Controllers
{
    [Produces("application/json")]
    [Route("api/Dishes")]
    public class DishesController : Controller
    {
        private readonly CedroRestaurantContext _context;

        public DishesController(CedroRestaurantContext context)
        {
            _context = context;
        }

        // GET: api/Dishes
        [HttpGet]
        public async Task<IActionResult> GetDishes()
        {
            var dishes = await _context.Dishes.Join(_context.Restaurants,
                    d => d.RestaurantId,
                    r => r.Id,
                    (d, r) => new { dish = d, rest = r }
                ).Select(selectResult => new
                {
                    Id = selectResult.dish.Id,
                    name = selectResult.dish.Name,
                    price = selectResult.dish.Price,
                    restaurantId = selectResult.rest.Id,
                    restaurantName = selectResult.rest.Name
                }
                ).OrderBy(sres => sres.restaurantId)
                .ToListAsync();

            return Ok(dishes);
        }

        // GET: api/Dishes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDish([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dish = await _context.Dishes.SingleOrDefaultAsync(m => m.Id == id);


            if (dish == null)
            {
                return NotFound();
            }

            return Ok(dish);
        }

        // PUT: api/Dishes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDish([FromRoute] Guid id, [FromBody] Dish dish)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dish.Id)
            {
                return BadRequest();
            }

            _context.Entry(dish).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Dishes
        [HttpPost]
        public async Task<IActionResult> PostDish([FromBody] Dish dish)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Dishes.Add(dish);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDish", new { id = dish.Id }, dish);
        }

        // DELETE: api/Dishes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDish([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dish = await _context.Dishes.SingleOrDefaultAsync(m => m.Id == id);
            if (dish == null)
            {
                return NotFound();
            }

            _context.Dishes.Remove(dish);
            await _context.SaveChangesAsync();

            return Ok(dish);
        }

        private bool DishExists(Guid id)
        {
            return _context.Dishes.Any(e => e.Id == id);
        }
    }
}