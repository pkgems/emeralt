import { endpoints } from '@/constants';
import { useIf } from '@/utils';
import { Router } from 'express';
export const searchHandler = ({ config }) => useIf(config.endpoints.search, Router().get(endpoints.search, (req, res) => {
    res.status(200).json({
        objects: [],
        total: 0,
        time: new Date().toString(),
    });
}));
