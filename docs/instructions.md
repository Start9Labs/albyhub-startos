# Instructions for Alby Hub on StartOS

Before starting Alby Hub for the first time, you must select your preferred Lightning implementation:

- **LND on this server**: This option tells Alby Hub to use the LND node installed on this StartOS server. It is the more sovereign and secure option, allowing full control over your node.
- **LDK embedded node**: This option tells Alby Hub to use its own, built-in LDK node. This option is convenient but offers less control over your node.

2. **Start the Service**
   After configuring, start the Alby Hub service.

3. **Launch Alby Hub**  
   Click the Web interface and launch your ALby Hub UI.

4. **Get Started**  
   On the Alby Welcome screen, click the **Get Started** button. The button will display either (LND) or (LDK) based on your chosen configuration.

5. **Create a Strong Password**  
   Set a strong password for your Alby Hub account. It's recommended to store this password securely in your self-hosted Vaultwarden. If you are using the Alby Hub embedded light node, it is critical you do not lose your password, as it will result in loss of funds.

6. **Enable Auto-Unlock (Recommended)**
   Once logged in to Alby Hub:
   - Navigate to Settings -> Auto Unlock
   - Enter the password you created in step 5
   - Click the "Enable Auto Unlock" button
   - **Note**: You must disable auto-unlock before changing your password or migrating your node

7. **Connect Your Alby Account (optional)**  
   Follow the on-screen instructions to connect your Alby account.

8. **All Set!**  
   You're done! Your Alby Hub is now ready to use.

## Getting Help

For more information and help about Alby Hub visit [albyhub.com](https://albyhub.com/)

You can also ask for assistance in the [Start9 community chats](https://start9.com/contact).
