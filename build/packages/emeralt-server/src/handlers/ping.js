import { endpoints } from '@/constants';
import { useIf } from '@/utils';
import { Router } from 'express';
export const pingHandler = ({ config }) => useIf(config.endpoints.ping, Router().get(endpoints.ping, (req, res) => {
    res.status(200).json({});
}));
