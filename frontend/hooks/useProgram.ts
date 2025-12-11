
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { AnchorProvider, Program, Idl, setProvider } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import idl from '../utils/idl.json';

// Use the ID from IDL or env
const PROGRAM_ID = new PublicKey('5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6');

export const useProgram = () => {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const program = useMemo(() => {
        if (!wallet) return null;

        const provider = new AnchorProvider(connection, wallet, {
            preflightCommitment: 'confirmed',
        });
        setProvider(provider);

        return new Program(idl as any, provider);
    }, [connection, wallet]);

    return { program, programId: PROGRAM_ID };
};
