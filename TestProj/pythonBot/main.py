import random
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes, CallbackQueryHandler

TOKEN= "6690495865:AAG8GZOuyMaYBqyVF4QAP_GBkugEi0N4Sfg"

BOT_USERNAME = "@LearntopiaBot"


# Commands

async def start_command(update : Update, context : ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hi there, thanks for chatting with me! Learntopia Bot at your service!")

async def help_command(update : Update, context : ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Feel free to chat with @luviein if LearntopiaBot can't help you!")

async def list_command(update : Update, context : ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("List of Commands: -updates (get latest updates on Learntopia), -math(play a math game!)")


# Function to generate a random math question
def generate_math_question():
    num1 = random.randint(1, 10)  # Generate a random number between 1 and 10
    num2 = random.randint(1, 10)  # Generate another random number between 1 and 10
    operator = random.choice(["+", "-", "*", "/"])  # Choose a random operator

    if operator == "/":
        answer = num1  # Set the answer equal to num1 to avoid decimals
    # Calculate the correct answer
    if operator == "+":
        answer = num1 + num2
    elif operator == "-":
        answer = num1 - num2
    elif operator == "*":
        answer = num1 * num2
    else:
        # Avoid division by zero

        answer = num1 // num2

    question = f"What is {num1} {operator} {num2}?"
    return question, answer

# Command handler for /math
async def math_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if "answered_correctly" not in context.user_data:
        question, answer = generate_math_question()
        await update.message.reply_text(question)

        # Store the correct answer in user's context for later checking
        context.user_data["math_answer"] = answer
    else:
        await update.message.reply_text("Great job! Use /math to get a new question.")

async def stop_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Remove the "answered_correctly" flag and any stored math question
    context.user_data.pop("answered_correctly", None)
    context.user_data.pop("math_answer", None)
    
    await update.message.reply_text("Math game has been stopped. Type /math to start a new game.")
    
    # Return here to prevent further processing of messages
    return

async def play_again_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if "answered_correctly" not in context.user_data:
        await update.message.reply_text("You can only use this command after answering a question correctly.")
    else:
        await math_command(update, context)


# Command handler for checking the answer
async def check_answer(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_answer = update.message.text.strip()

    if "math_answer" in context.user_data:
        correct_answer = context.user_data["math_answer"]

        try:
            user_answer = int(user_answer)  # Convert user's answer to an integer
            if user_answer == correct_answer:
                response = "Correct! 🎉"
                # Add a "Play Again" button
                keyboard = [[InlineKeyboardButton("Play Again", callback_data="play_again")]]
                reply_markup = InlineKeyboardMarkup(keyboard)
                await update.message.reply_text(response, reply_markup=reply_markup)
                # Set the "answered_correctly" flag
                context.user_data["answered_correctly"] = True
            else:
                response = "Incorrect. Try again."
                await update.message.reply_text(response)
        except ValueError:
            response = "Invalid input. Please enter a number."
            await update.message.reply_text(response)
        
        return  # Exit the function here to prevent further replies
    else:
        await handle_messages(update, context)
        # await update.message.reply_text("No active math question. Use /math to get a new question.")
        return
# Callback handler for the "Play Again" button
async def play_again_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    if query.data == "play_again":
        await query.answer()  # Acknowledge the button press

        # Generate a new math question
        question, answer = generate_math_question()

        # Send the new question as a message
        await query.message.reply_text(question)

        # Update the correct answer in user's context for checking
        context.user_data["math_answer"] = answer

        # Remove the "answered_correctly" flag
        context.user_data.pop("answered_correctly", None)


# Responses

def handle_response(text : str) -> str:
    processed: str = text.lower()
    print(processed)
    if "hello" in processed:
        return "Hey there!"

    if "how are you" in processed:
        return "I am good"
    
    if "updates" in processed:
        return "Learntopia is launching soon on learntopia.pro~"
    
    return "I do not understand what you wrote"

async def handle_messages(update: Update, context: ContextTypes.DEFAULT_TYPE):
  
            
    # inform us if it is a group chat or private chat
    response: str = ""
    message_type: str = update.message.chat.type
    text: str = update.message.text

    # gets the user id of the person sending the chat in private/group chat
    print(f'User ({update.message.chat.id}) in {message_type}: "{text}"')

    if "math_answer" not in context.user_data and "answered_correctly" not in context.user_data:
        if message_type == 'group':
            if BOT_USERNAME in text:
                # only want to process text not bot username
                new_text: str = text.replace(BOT_USERNAME, '').strip()
                response: str = handle_response(new_text)  # Corrected variable name
                print(new_text)
                # bot won't respond unless the username is called
            else:
                pass 
        else:
            # for private chats
            response: str = handle_response(text)
    elif message_type == 'group':
        if BOT_USERNAME in text:
            # only want to process text not bot username
            new_text: str = text.replace(BOT_USERNAME, '').strip()
            response: str = handle_response(new_text)  # Corrected variable name
            # bot won't respond unless the username is called
        else:
            pass 
    else:
        # for private chats
        response: str = handle_response(text)

    if len(response) <= 0:
        return
    print('Bot:', response)
    await update.message.reply_text(response)

# async def handle_messages(update : Update , context: ContextTypes.DEFAULT_TYPE):

#     if "math_answer" not in context.user_data and "/math" not in update.message.text:
#         if message_type == 'group':
#             if BOT_USERNAME in text:
#                 # only want to process text not bot username
#                 new_text: str = text.replace(BOT_USERNAME, '').strip()
#                 print(new_text)
#                 response: str = handle_response(new_text)  # Corrected variable name
#                 print(new_text)
            
#                 # bot wont reponse unless username is called
#             else:
#                 return 
#         else:
#             # for private chats
#             response: str = handle_response(text)
#     # inform us if is a group chat or private chat
#     message_type: str = update.message.chat.type
#     text: str = update.message.text

#     # gets the user id of the person sending the chat in private/group chat
#     print(f'User ({update.message.chat.id}) in {message_type}: "{text}"')

#     if message_type == 'group':
#         if BOT_USERNAME in text:
#             # only want to process text not bot username
#             new_text: str = text.replace(BOT_USERNAME, '').strip()
#             print(new_text)
#             response: str = handle_response(new_text)  # Corrected variable name
#             print(new_text)
        
#             # bot wont reponse unless username is called
#         else:
#             return 
#     else:
#         # for private chats
#         response: str = handle_response(text)

#     print('Bot:', response)

#     await update.message.reply_text(response)


async def error(update : Update , context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}')

if __name__ == '__main__':
    print('Starting bot...')
    app = Application.builder().token(TOKEN).build()

    # Commands
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('list', list_command))

     # Command handler for /math
    app.add_handler(CommandHandler('math', math_command))

  # Message handler for checking the answer
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, check_answer))

    app.add_handler(CommandHandler('playagain', play_again_command))

    app.add_handler(CallbackQueryHandler(play_again_callback))

    app.add_handler(CommandHandler('stop', stop_command))
    # Messages
    # app.add_handler(MessageHandler(filters.Regex("^[a-zA-Z0-9]+$"), handle_messages))

    # Errprs
    app.add_error_handler(error)

    # Checks every 5s for new messages
    print('Polling...')
    app.run_polling(poll_interval=5)