import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";

actor DonationCanister {
    // Define the Memo type
    public type Memo = {
        name : Text;
        message : Text;
        timestamp : Int;
        from : Principal;
        amount : Nat;
    };

    // Store donation information
    private stable var memos : [Memo] = [];
    private stable var total : Nat = 0;
    private stable var owner : Principal = Principal.fromText("2vxsx-fae"); // Replace with your principal

    // Constructor equivalent - initialize the owner
    public shared(msg) func init() : async () {
        owner := msg.caller;
    };

    // Donate function - records a donation
    public shared(msg) func donate(name : Text, message : Text, amount : Nat) : async () {
        assert(amount > 0);
        
        let memo : Memo = {
            name = name;
            message = message;
            timestamp = Time.now();
            from = msg.caller;
            amount = amount;
        };
        
        memos := Array.append(memos, [memo]);
        total += amount;
        
        Debug.print("New donation received from: " # Principal.toText(msg.caller));
    };

    // Get all memos
    public query func getMemos() : async [Memo] {
        return memos;
    };

    // Get total donations collected
    public query func getTotalDonationCollected() : async Nat {
        return total;
    };

    // Get owner
    public query func getOwner() : async Principal {
        return owner;
    };

    // Check if caller is owner
    public query(msg) func isOwner() : async Bool {
        return msg.caller == owner;
    };

    // System functions
    system func preupgrade() {
        Debug.print("Preparing for canister upgrade");
    };

    system func postupgrade() {
        Debug.print("Canister upgrade complete");
    };
}