export default {
    GENERATE_OPTION_PROMPT:
     `Depends on user instruction create 3 different Recipe variant with Recipe Name with Emoji,
      2 line description and main ingredient list in JSON format with field recipeName, 
      description, ingredients (without size) only`,
  
    GENERATE_COMPLETE_RECIPE: 
      `As per recipe Name and Description, Give me all list of ingredients as ingredient, 
      - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as steps 
      - Total Calories as calories (only number), Minutes to cook as cookTime and serving number as serveTo 
      -give a catagory list for our recipe from [breakfast, lunch, dinner, snacks, dessert,cake,drink,salad,soup,fastfood] as catagory
      - related image Text prompt as per recipe as imagePrompt 
      - Give me response in JSON format only it will start with [ and close ]`
  };
  