
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { AnchorProvider, Program, Idl, setProvider } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import idl from '../utils/idl.json';

// Use the ID from IDL or env
export const useProgram = () => {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const programId = useMemo(() => new PublicKey('5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6'), []);

    const program = useMemo(() => {
        if (!wallet) return null;

        const provider = new AnchorProvider(connection, wallet, {
            preflightCommitment: 'confirmed',
        });

        try {
            // Ensure IDL is valid
            if (!idl || !idl.metadata || !idl.metadata.address) {
                console.error("Invalid IDL imported in useProgram", idl);
                return null;
            }

            console.log("Initializing Program with:", {
                address: programId.toString(),
                providerWallet: provider.wallet.publicKey.toString()
            });

            // Explicitly cast idl to any to avoid strict type checks on json import
            return new Program(idl as any, programId, provider);
        } catch (err) {
            console.error("Program init failed:", err);
            return null;
        }
    }, [connection, wallet, programId]);

    return { program, programId };
};
