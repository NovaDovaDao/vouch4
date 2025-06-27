import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly senderEmail: string;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('resendApiKey');
    if (!apiKey) {
      this.logger.error('Resend API Key is not configured.');
      throw new InternalServerErrorException('Mail service not configured.');
    }
    this.resend = new Resend(apiKey);
    this.senderEmail = this.configService.getOrThrow<string>('senderEmail');
    if (!this.senderEmail) {
      this.logger.error('Sender email is not configured.');
      throw new InternalServerErrorException(
        'Mail service sender email not configured.',
      );
    }
  }

  async sendInvitationEmail(
    to: string,
    userName: string,
    invitationLink: string,
  ): Promise<void> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: `Your Gym Platform <${this.senderEmail}>`,
        to: [to],
        subject: 'You are invited to join our Gym Platform!',
        html: `
          <p>Hello ${userName},</p>
          <p>You have been invited to join our Gym Platform. To set up your account and get started, please click the link below:</p>
          <p><a href="${invitationLink}">${invitationLink}</a></p>
          <p>This link will expire in 24 hours for security reasons.</p>
          <p>If you did not expect this invitation, please ignore this email.</p>
          <p>Best regards,</p>
          <p>The Gym Platform Team</p>
        `,
      });

      if (error) {
        this.logger.error(`Failed to send invitation email to ${to}:`, error);
        throw new InternalServerErrorException(
          'Failed to send invitation email.',
        );
      }
      this.logger.log(`Invitation email sent to ${to}. Resend ID: ${data!.id}`);
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(
          `Error in sendInvitationEmail for ${to}:`,
          error.message,
          error.stack,
        );
      throw new InternalServerErrorException('Error sending invitation email.');
    }
  }
}
