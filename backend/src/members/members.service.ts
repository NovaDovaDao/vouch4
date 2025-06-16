import { Injectable } from "jsr:@danet/core";

// Mock data
const mockMembers = [
  {
    id: "mem_123",
    name: "Alice Smith",
    email: "alice@example.com",
    walletAddress: "0x1A2b3C4d5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B",
    membershipStatus: "Active",
    membershipType: "Monthly Unlimited",
    membershipNftId: "0xabc123...", // Placeholder
    waiverStatus: "Signed (Blockchain Verified)",
    profilePicUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "mem_456",
    name: "Bob Johnson",
    email: "bob@example.com",
    walletAddress: "0xBbCcDdEeFf00112233445566778899AaBbCcDdEe",
    membershipStatus: "Pending",
    membershipType: "10-Visit Pass",
    membershipNftId: null,
    waiverStatus: "Pending Signature",
    profilePicUrl: "https://i.pravatar.cc/150?img=2",
  },
  // Add more mock members as needed
];

@Injectable()
export class MembersService {
  findAll() {
    return mockMembers;
  }

  findById(id: string) {
    return mockMembers.find((member) => member.id === id);
  }

  findByWalletAddress(walletAddress: string) {
    // Simulate finding a member by their wallet address for check-in
    return mockMembers.find(
      (member) =>
        member.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
  }

  // Simulate a check-in operation
  checkIn(memberId: string) {
    const member = this.findById(memberId);
    if (member) {
      // In a real app, this would involve more complex logic,
      // potentially an on-chain check via a Deno utility
      // For MVP, just simulate success
      console.log(`Member ${member.name} checked in!`);
      return { success: true, message: `Welcome, ${member.name}!` };
    }
    return { success: false, message: "Member not found." };
  }

  // Simulate updating a member's waiver status
  updateWaiverStatus(memberId: string, status: string) {
    const member = this.findById(memberId);
    if (member) {
      member.waiverStatus = status; // Mock update
      // In a real scenario, this would involve calculating hash and sending tx
      return {
        success: true,
        message: `Waiver status updated for ${member.name}`,
      };
    }
    return { success: false, message: "Member not found." };
  }

  // Simulate signing up a new member
  async createMember(newMemberData: any) {
    // In a real app, this would involve minting an NFT,
    // recording waiver hash, etc.
    const newMember = {
      id: `mem_${Date.now()}`, // Simple ID generation
      membershipStatus: "Active",
      membershipType: "Trial Pass", // Default for new signups
      membershipNftId: "0x" + Math.random().toString(16).substring(2, 12), // Mock NFT ID
      waiverStatus: "Pending Signature",
      profilePicUrl:
        "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
      ...newMemberData,
    };
    mockMembers.push(newMember);
    console.log(`New member signed up: ${newMember.name}`);
    return newMember;
  }
}
