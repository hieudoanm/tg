import { tonClient } from '@telegram/clients/ton.client';
import { Address } from '@ton/core';
import {
	useTonConnectUI,
	useTonWallet,
	Wallet,
	WalletInfoWithOpenMethod,
} from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export const useWallet = () => {
	const [{ balance = BigInt(0) }, setState] = useState<{ balance: bigint }>({
		balance: BigInt(0),
	});
	const [tonConnectUI] = useTonConnectUI();
	const wallet: Wallet | (Wallet & WalletInfoWithOpenMethod) | null =
		useTonWallet();

	const address: string = wallet?.account.address ?? '';
	const shortAddress = wallet?.account.address
		? `${address.slice(0, 6)}...${address.slice(-4)}`
		: null;

	useEffect(() => {
		if (!address) return;

		const fetchBalance = async () => {
			const addressClass: Address = Address.parse(address);
			const balance: bigint = await tonClient.getBalance(addressClass);
			setState((previous) => ({ ...previous, balance }));
		};

		fetchBalance();
	}, [address]);

	const connect = () => {
		if (!wallet) tonConnectUI.openModal();
	};

	const disconnect = () => {
		if (wallet) tonConnectUI.disconnect();
	};

	return { balance, address, shortAddress, wallet, connect, disconnect };
};
