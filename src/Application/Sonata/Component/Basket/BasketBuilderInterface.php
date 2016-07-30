<?php

namespace Application\Sonata\Component\Basket;

interface BasketBuilderInterface
{
    /**
     * Build a basket
     *
     * @param \Application\Sonata\Component\Basket\BasketInterface $basket
     */
    public function build(BasketInterface $basket);
}
