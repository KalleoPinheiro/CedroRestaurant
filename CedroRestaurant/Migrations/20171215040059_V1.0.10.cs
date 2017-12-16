using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CedroRestaurant.Migrations
{
    public partial class V1010 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dish_Restaurant_RestaurantId",
                table: "Dish");

            migrationBuilder.AlterColumn<Guid>(
                name: "RestaurantId",
                table: "Dish",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Dish_Restaurant_RestaurantId",
                table: "Dish",
                column: "RestaurantId",
                principalTable: "Restaurant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dish_Restaurant_RestaurantId",
                table: "Dish");

            migrationBuilder.AlterColumn<Guid>(
                name: "RestaurantId",
                table: "Dish",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddForeignKey(
                name: "FK_Dish_Restaurant_RestaurantId",
                table: "Dish",
                column: "RestaurantId",
                principalTable: "Restaurant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
