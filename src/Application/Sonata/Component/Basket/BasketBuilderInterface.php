<?php

namespace Application\Sonata\Component\Basket;

interface BasketBuilderInterface
{
    /**
     * Build a basket
     *
     * @param BasketInterface $basket
     */
    public function build(BasketInterface $basket);
}
